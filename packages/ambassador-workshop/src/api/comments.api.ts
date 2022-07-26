import { method } from '@wix/yoshi-flow-bm/serverless';
import { NodeWorkshopScalaApp } from '@wix/ambassador-node-workshop-scala-app/rpc';

const commentsService = NodeWorkshopScalaApp().CommentsService();

export const fetch = method(function handler() {
  return commentsService(this.context.aspects).fetch(
    'a1ea1e40-8698-42e7-a75a-85cd95ffaa23',
  );
});
