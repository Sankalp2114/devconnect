"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleUser } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { profile } from "console";
import { usePathname, useRouter } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";

import { updateUser } from "@/lib/actions/user.actions";
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.action";
interface PostThreadProps {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

function PostThread({ userId }: { userId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const { organization } = useOrganization();

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    if (!organization) {
      await createThread({
        text: values.thread,
        author: userId,
        communityId: null,
        path: pathname,
      });
    } else {
      await createThread({
        text: values.thread,
        author: userId,
        communityId: organization.id,
        path: pathname,
      });
    }

    router.push("/");
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                What's on your mind?
              </FormLabel>
              <FormControl className="border border-dark-4 bg-dark-3 text-light-1 no-focus">
                <Textarea rows={15} placeholder="..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500">
          Post
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;
