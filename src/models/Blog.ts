import mongoose, { Schema, Document, models } from "mongoose";


export interface IBlog extends Document {
title: string;
slug: string;
category: string;
tags: string[];
image: string;
content: string; // markdown with code blocks
createdAt: Date;
updatedAt: Date;
}


const BlogSchema = new Schema<IBlog>(
{
title: { type: String, required: true },
slug: { type: String, required: true, unique: true },
category: { type: String, required: true },
tags: [{ type: String }],
image: { type: String, required: true },
content: { type: String, required: true },
},
{ timestamps: true }
);


export default models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);