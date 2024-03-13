import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import crypto from "crypto";
import { mailOptions, transporter } from "@/config/nodemailer";
import welcomeEmail from "@/lib/welcomeEmail";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // const { hrEmail, licenseTypeId, organizationData } = body;

    const result = await prisma.$transaction(async (prisma) => {
      // 1. Create the organization with the user email for the user HR
      const organization = await prisma.organization.create({
        data: {
          name: body.name,
          industry: body.industry,
        },
      });

      const ifUserEmailExists = await prisma.user.findFirst({
        where: {
          email: body.hrEmail,
        },
      });
      if (ifUserEmailExists) {
        throw new Error("User with the email already exists");
      }

      //   2. Create token for the user to create password

      const resetToken = crypto.randomBytes(20).toString("hex");
      const passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

      const passwordResetTokenExpiry = Date.now() + 3600000; // 1 hour from now
      console.log({ resetToken, passwordResetToken, passwordResetTokenExpiry });
      // 3. Create a user record using the email
      const user = await prisma.user.create({
        data: {
          email: body.hrEmail,
          organizationId: organization.id,
          resetToken: passwordResetToken,
          resetTokenExpiry: passwordResetTokenExpiry,
        },
      });

      // 4. Send an email to the user with the token
      const { subject, text, html } = welcomeEmail(resetToken);

      // Use this `emailHtml` as the `html` property in your Nodemailer mailOptions object.

      const msg = {
        to: body.hrEmail,
        from: mailOptions.from,
        subject,
        html,
      };

      const sendEmail = await transporter.sendMail(msg);

      // 4. Create the license using the organizationId and licenseTypeId
      const license = await prisma.license.create({
        data: {
          organizationId: organization.id,
          licenseKeyId: parseInt(body.licenseTypeId),
          validUntil: new Date(),
        },
      });

      //   console.log({ user, organization, license });

      return { organization, license };
    });

    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    console.log(error);
    if (
      error instanceof Error &&
      error.message === "User with the email already exists"
    ) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else {
      // Handle unexpected server errors
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    const organizations = await prisma.organization.findMany({
      where: {
        deleted: false,
      },
      orderBy: {
        id: "asc",
      },
    });
    return NextResponse.json(organizations, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// generate PUT request
export async function PUT(request: NextRequest) {
  const body = await request.json();

  const organization = await prisma.organization.update({
    where: { id: body.id },
    data: { ...body },
  });
  console.log({ organization });

  return NextResponse.json(organization, { status: 201 });
}
