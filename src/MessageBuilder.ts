import { Telegraf, Markup } from "telegraf";
import { IBotContext } from "./context/context.interface";
import {MessageOptions} from "child_process";

class MessageBuilder {
    constructor(private bot: Telegraf<IBotContext>) {}

    buildMessage(options: MessageOptions, ctx: IBotContext) {
        ctx.reply(options.text, Markup.inlineKeyboard(
            options.buttons.map((button) =>
                Markup.button.callback(button.text, button.callback)
            )
        ));
    }
}
