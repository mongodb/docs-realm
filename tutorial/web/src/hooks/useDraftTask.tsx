import * as React from "react";
import BSON from "bson";
import { User, GetUserQuery } from "../types";
import { TaskStatus, TaskActions } from "./useTasks";
import { useGetUserQuery } from "../graphql-operations";

export type DraftTask = {
  status: TaskStatus;
  name: string;
  assignee?: string;
};

export interface DraftTaskActions {
  createDraft: (draft: DraftTask) => void;
  updateDraft: (draft: DraftTask) => void;
  deleteDraft: () => void;
  saveDraft: () => Promise<void>;
}

export default function useDraftTask(
  currentUser: Realm.User,
  taskActions: TaskActions
): [DraftTask | null, DraftTaskActions] {
  const [draft, setDraft] = React.useState<DraftTask | null>(null);
  const [draftUser, setDraftUser] = React.useState<User | null>(null);
  useGetUserQuery({
    variables: { userId: currentUser.id },
    onCompleted: ({ user }: GetUserQuery) => {
      if (user) {
        setDraftUser(user);
      }
    },
  });

  const actions: DraftTaskActions = {
    createDraft: (draft: DraftTask) => {
      if (draft) {
        setDraft(draft);
      }
    },
    updateDraft: (updatedDraft: DraftTask) => {
      setDraft(updatedDraft);
    },
    deleteDraft: () => {
      setDraft(null);
    },
    saveDraft: async () => {
      if (draft) {
        await taskActions.addTask({
          ...draft,
          _id: new BSON.ObjectId(),
          assignee: draftUser,
          _partition: "My Project",
        });
        setDraft(null);
      }
    },
  };
  return [draft, actions];
}
