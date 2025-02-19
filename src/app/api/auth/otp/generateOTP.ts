import {
  ApiResponse,
  ApiSuccessResponse,
} from "@/api/utils/response/apiResponse";
import { prisma } from "@/api/utils/prisma";

export async function generateOTP(email: string): Promise<ApiSuccessResponse> {
  const response = new ApiResponse();
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await prisma.registrant.upsert({
      where: {
        email: email,
      },
      update: {
        verification_code: otp,
      },
      create: {
        email: email,
        verification_code: otp,
      },
    });
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }

  return response.success({ data: { otp: otp } });
}
