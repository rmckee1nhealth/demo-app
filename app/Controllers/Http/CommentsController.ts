import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment';
import Post from 'App/Models/Post';
import { schema } from '@ioc:Adonis/Core/Validator'

export default class CommentsController {
    public async index({params}: HttpContextContract) {
        const post = await Post.findOrFail(params.post_id);
        return await post.related('comments').query();
    }

    public async store({ params, request }: HttpContextContract) {
        const newCommentSchema = schema.create({
            body: schema.string({ trim: true })
        })
        const payload = await request.validate({schema: newCommentSchema})
        const post = await Post.findOrFail(params.post_id);
        const comment = post.related('comments').create(payload)
        return comment;
    }

    public async show({params, response}: HttpContextContract) {
        const post = await Comment.find(params.id)
        response.status(200)
        return post;
    }

    public async update({params, request }: HttpContextContract) {
        const updateCommentSchema = schema.create({
            body: schema.string({ trim: true })
        })
        const payload = await request.validate({schema: updateCommentSchema})
        const post = await Comment.findOrFail(params.id);
        post.merge({
            body: payload.body
        })
        .save();

        return post;
    }

    public async destroy({params}: HttpContextContract) {
        const post = await Comment.findOrFail(params.id)
        return post.delete();
    }
}
