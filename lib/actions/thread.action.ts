"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Community from "../models/community.model";

interface ThreadParams {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createThread({
  text,
  author,
  communityId,
  path,
}: ThreadParams) {
  try {
    connectToDB();
    const communityIdObject = await Community.findOne(
      { id: communityId },
      { _id: 1 }
    );

    const createdThread = await Thread.create({
      text,
      author,
      community: communityIdObject,
    });

    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });
    if (communityIdObject) {
      await Community.findByIdAndUpdate(communityIdObject, {
        $push: { threads: createdThread._id },
      });
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Trouble creating thread: ${error.message} `);
  }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDB();

  const skip = (pageNumber - 1) * pageSize;

  const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skip)
    .limit(pageSize)
    .populate({ path: "author", model: User })
    .populate({
      path: "community",
      model: Community,
    })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    });

  const totalPosts = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  });

  const posts = await postsQuery.exec();

  const isNext = totalPosts > skip + posts.length;

  return { posts, isNext };
}

export async function fetchPostById(id: string) {
  connectToDB();
  try {
    const post = await Thread.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "community",
        model: Community,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name parentId image",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image",
            },
          },
        ],
      })
      .exec();
    return post;
  } catch (error: any) {
    throw new Error(`error fetching post: ${error.message} `);
  }
}

export async function addComment(
  threadId: string,
  commentText: string,
  userId: string,
  path: string
) {
  connectToDB();
  try {
    const post = await Thread.findById(threadId);
    if (!post) {
      throw new Error("Post Not Found");
    }

    const comment = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId,
    });

    const savedComment = await comment.save();

    post.children.push(savedComment._id);
    await post.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`error postion comment: ${error.message} `);
  }
}

export async function likePost(threadId: string, userId: string) {
  connectToDB();
  try {
    const post = await Thread.findById(threadId);
    if (!post) throw new Error("Post not found");
    post.likes += 1;
    await post.save();
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { likedPosts: threadId } },
      { new: true }
    );

    return updatedUser;
  } catch (error: any) {
    throw new Error(`error postion comment: ${error.message} `);
  }
}

export async function dislikePost(threadId: string, userId: string) {
  connectToDB();
  try {
    const post = await Thread.findById(threadId);
    if (!post) throw new Error("Post not found");
    post.likes -= 1;
    await post.save();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { likedPosts: threadId } },
      { new: true }
    );

    return updatedUser;
  } catch (error: any) {
    throw new Error(`Error disliking post: ${error.message}`);
  }
}

export async function fetchLikedPosts(userId: string) {
  connectToDB();
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user.likedPosts;
  } catch (error: any) {
    throw new Error(`Error fetching liked posts: ${error.message}`);
  }
}
