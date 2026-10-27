import { describe, it, expect } from "vitest";
import {
  validateLoginForm,
  validateSignUpForm,
  validateCategoryForm,
  validateResetPasswordForm,
  validateCreatePostForm,
} from "./validateForm";

describe("validateLoginForm", () => {
  it("คืน {} เมื่อกรอกถูกครบ", () => {
    // Arrange
    const form = { email: "somchai@example.com", password: "12345678" };

    // Act
    const errors = validateLoginForm(form);

    // Assert
    expect(errors).toEqual({});
  });

  it("ฟ้องทั้ง 2 ช่องเมื่อเว้นว่าง", () => {
    const errors = validateLoginForm({ email: "", password: "" });

    expect(errors).toEqual({
      email: "Please enter your email address",
      password: "Please enter a password",
    });
  });

  it("ฟ้อง email ผิดรูปแบบ", () => {
    const errors = validateLoginForm({ email: "somchai@mail", password: "12345678" });

    expect(errors.email).toBe("Please enter a valid email address");
    expect(errors.password).toBeUndefined();
  });

  it("ฟ้อง password สั้นกว่า 8 ตัว", () => {
    const errors = validateLoginForm({ email: "somchai@example.com", password: "1234567" });

    expect(errors.password).toBe("Password must be at least 8 characters");
  });

  it("edge case: ไม่มี field เลย → ไม่พัง แต่ฟ้องทุกช่อง", () => {
    expect(validateLoginForm({})).toEqual({
      email: "Please enter your email address",
      password: "Please enter a password",
    });
  });
});

describe("validateSignUpForm", () => {
  it("ช่องที่มีแต่ช่องว่าง (space) ถือว่าว่าง", () => {
    const errors = validateSignUpForm({
      name: "   ",
      username: "somchai",
      email: "somchai@example.com",
      password: "12345678",
    });

    expect(errors).toEqual({ name: "Please enter your full name" });
  });

  it("edge case: ไม่มี field เลย → ไม่พัง แต่ฟ้องทุกช่อง", () => {
    expect(validateSignUpForm({})).toEqual({
      name: "Please enter your full name",
      username: "Please enter a username",
      email: "Please enter your email address",
      password: "Please enter a password",
    });
  });
});

describe("validateCategoryForm", () => {
  it("ชื่อว่าง → ฟ้อง", () => {
    expect(validateCategoryForm({ name: "" })).toEqual({ name: "Please enter a category name" });
  });

  it("edge case: ไม่มี field name → ไม่พัง แต่ฟ้อง", () => {
    expect(validateCategoryForm({})).toEqual({ name: "Please enter a category name" });
  });
});

describe("validateResetPasswordForm", () => {
  it("ฟ้องเมื่อ confirm ไม่ตรงกับ new password", () => {
    const errors = validateResetPasswordForm({
      currentPassword: "oldpass123",
      newPassword: "newpass123",
      confirmPassword: "newpass999",
    });

    expect(errors).toEqual({ confirmPassword: "Passwords do not match" });
  });
});

describe("validateCreatePostForm", () => {
  it("description ยาวเกิน 120 ตัว + ไม่มีรูป → ฟ้อง 2 อย่าง", () => {
    const form = {
      title: "Hello",
      category_id: 1,
      description: "a".repeat(121),
      content: "Body",
    };

    const errors = validateCreatePostForm(form, null);

    expect(errors).toEqual({
      description: "Introduction must be less than 120 characters",
      image: "Please upload a thumbnail image",
    });
  });
});