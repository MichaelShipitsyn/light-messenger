export type UserProfile = {
  readonly bio: string;
  readonly avatar: string;
  readonly createdAt: string;
  readonly updatedAt: string;
};

export type User = {
  readonly id: number;
  readonly username: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly profile: UserProfile | null;
};

export type ApiError = {
  readonly statusCode: number;
  readonly code?: string;
  readonly error: string;
  readonly message: string;
};

export type Message = {
  readonly id: number;
  readonly text: string;
  readonly creatorId: number;
  readonly dialogId: number;
  readonly createdAt: string;
  readonly updatedAt: string;
};

export type Participant = {
  readonly userId: number;
  readonly dialogId: number;
  readonly user: Omit<User, 'id'>;
};

export type Dialog = {
  readonly id: number;
  readonly messages: Message[];
  readonly participants: [Participant, Participant];
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly lastMessage: {
    readonly id: number;
    readonly text: string;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly creator: {
      readonly id: number;
      readonly username: string;
      readonly profile: {
        readonly avatar: string;
      } | null;
    };
  };
};
