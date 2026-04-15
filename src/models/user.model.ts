import { Schema, Model } from 'mongoose';
import * as z from 'zod';
import * as bcrypt from 'bcrypt';

// Zod schema
const emailSchema = z.email();

// TODO: Add profile and cover image support to model

const userSchemaDefinition = new Schema(
  {
    username: {
      type: String,
      trim: true,
      minLength: [8, 'Username cannot be less than 8 characters'],
      maxlength: [32, 'Username must be less than 32 characters'],
      required: [true, 'Username must be provided'],
      validate: {
        validator: function (uncheckedUsername) {
          return /^[a-zA-Z0-9_]+$/.test(uncheckedUsername);
        },
        message: 'Username must only include letters, numbers or underscores',
      },
    },
    fullName: {
      type: String,
      trim: true,
      required: [true, 'Full name must be provided'],
    },
    email: {
      type: String,
      trim: true,
      unique: [true, 'Email already exists'],
      required: [true, 'Email must be provided'],
      validate: {
        validator: function (uncheckedEmail) {
          return emailSchema.safeParse(uncheckedEmail).success;
        },
        message: 'Invalid email address',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required for creating user'],
    },
    refreshToken: {
      type: String,
      required: [true, 'Refresh token must be created'],
    },
  },
  {
    timestamps: true,
  }
);

// Middleware for hashing

userSchemaDefinition.pre('save', async function () {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 12);
});

export const User = new Model('user', userSchemaDefinition);
