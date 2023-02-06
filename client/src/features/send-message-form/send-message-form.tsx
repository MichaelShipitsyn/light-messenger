import { Button } from '@lm-client/shared/ui';
import { useUnit } from 'effector-react';
import * as model from './model';

export const SendMessageForm = () => {
  const [text, handleChangeText, handleSubmitTextForm] = useUnit([
    model.$messageText,
    model.messageTextChanged,
    model.textFormSubmitted,
  ]);

  return (
    <form
      onSubmit={(e) => (e.preventDefault(), handleSubmitTextForm())}
      className="flex h-100 gap-15 border-t-2 border-blue p-10"
    >
      <textarea
        value={text}
        onChange={(e) => handleChangeText(e.target.value)}
        name="message-text"
        className="h-80 w-full resize-none overflow-auto rounded-3 border border-black p-5 outline-none focus:border-blue focus:outline-1 focus:outline-offset-1 focus:outline-blue"
      />
      <Button className="self-end" color="blue" type="submit">
        Send
      </Button>
    </form>
  );
};
