import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";

// Evita criar múltiplas conexões no hot-reload do Next.js
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);
const MEU_EMAIL = "luccabarros2003@gmail.com";
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// GET: Busca os vales disponíveis
export async function GET() {
  try {
    const vouchers = await prisma.voucher.findMany({
      where: {
        isActive: true,
        isRedeemed: false // Só traz os que não foram usados
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(vouchers);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar vales" }, { status: 500 });
  }
}

// PUT: Marca um vale como usado
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    const updatedVoucher = await prisma.voucher.update({
      where: { id },
      data: {
        isRedeemed: true,
        redeemedAt: new Date()
      }
    });

    if (updatedVoucher.type === "ACTION") {
      try {
        const { data, error } = await resend.emails.send({
          from: 'onboarding@resend.dev', // Pode deixar esse email padrão de testes do Resend
          to: MEU_EMAIL,
          subject: `❤️ ELA USOU UM VALE: ${updatedVoucher.title}`,
          html: `
            <div style="font-family: sans-serif; color: #333;">
              <h1>Opa, corre aqui! 🏃‍♂️</h1>
              <p>A Larissa acabou de resgatar um vale no site.</p>
              <hr />
              <h3>🎁 Vale: ${updatedVoucher.title}</h3>
              <p><strong>Descrição:</strong> ${updatedVoucher.description}</p>
              <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</p>
              <hr />
              <p>Já pode ir se preparando para cumprir a promessa!</p>
            </div>
          `
        });

        if (error) {
          console.error("❌ ERRO NO RESEND (Produção):", error);
          // Opcional: retornar erro para o front saber também
        } else {
          console.log("✅ SUCESSO REAL! ID do Email:", data?.id);
        }
        
        console.log("E-mail enviado com sucesso!");
      } catch (emailError) {
        console.error("Erro ao enviar e-mail:", emailError);

      }
    }

    return NextResponse.json(updatedVoucher);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar vale" }, { status: 500 });
  }
}