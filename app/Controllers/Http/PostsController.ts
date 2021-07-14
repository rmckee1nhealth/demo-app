import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator';

import Post from "App/Models/Post";

export default class PostsController {
    public async index() {
        return await Post.all();
    }

    public async store({ request, response }: HttpContextContract) {
        const newPostSchema = schema.create({
            subject: schema.string({ trim: true })
        })
        const payload = await request.validate({schema: newPostSchema})
        const post = await Post.create(payload);
        response.status(201);
        return post;    
    }

    public async show({params, response}: HttpContextContract) {
        const post = await Post.find(params.id)
        response.status(200)
        return post;
    }

    public async update({params, request }: HttpContextContract) {
        const updatePostSchema = schema.create({
            subject: schema.string({ trim: true })
        })
        const payload = await request.validate({schema: updatePostSchema})
        const post = await Post.findOrFail(params.id);
        post.merge({
            subject: payload.subject
        })
        .save();

        return post;
    }

    public async destroy({params}: HttpContextContract) {
        const post = await Post.findOrFail(params.id)
        return post.delete();
    }
}
