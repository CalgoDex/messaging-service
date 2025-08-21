CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- enums
CREATE TYPE sms_type AS ENUM ('sms', 'mms');
CREATE TYPE convo_type AS ENUM ('sms', 'email');

-- conversations
CREATE TABLE conversations (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    "to" text NOT NULL,
    "from" text NOT NULL,
    type convo_type NOT NULL,
    message_ids integer[],
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT conversations_pkey PRIMARY KEY (id)
);

-- messages
CREATE TABLE messages (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    "to" text NOT NULL,
    "from" text NOT NULL,
    body text NOT NULL,
    type sms_type,
    conversation_id uuid NOT NULL,
    "timestamp" timestamptz NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT messages_pkey PRIMARY KEY (id),
    CONSTRAINT fk_conversation_id
      FOREIGN KEY (conversation_id)
      REFERENCES conversations (id)
      ON DELETE CASCADE
);
