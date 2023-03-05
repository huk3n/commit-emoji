interface Context {
  emoji: string
  subject: string
}
export type Rules = (context: Partial<Context>, message: string) => Promise<void>

export async function execute_rules(message: string, rules: Rules[]): Promise<void> {
  const cxt = {};
  for (const rule of rules) {
    const result = await rule(cxt, message).then(() => null).catch(err => err);
    if (result !== null){
      throw new Error(result);
    }
  }
}
