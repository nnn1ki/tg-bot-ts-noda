import { Telegraf, Markup } from "telegraf";
import { IBotContext } from "./context/context.interface";
import {MessageOptions} from "./commands/start.command";
import {callback} from "telegraf/typings/button";

import { callbackQuery } from "telegraf/filters";

//класс получает данные и делает из этого сообщение




export class MessageBuilder {

    private ansCallBack: string = '';

    constructor(private bot: Telegraf<IBotContext>) {}


    buildMessage(options: { buttons: { callback: string; text: string }[]; text: string }, ctx: IBotContext,
        // callback: (ansCallBack: string) => void // Обратный вызов для передачи значения
    ): string {
        let ansCallBack: string = '';

        // Реакция бота на начало диалога
        ctx.reply(
            options.text,
            Markup.inlineKeyboard(
                options.buttons.map((button) =>
                    Markup.button.callback(button.text, button.callback)
                )
            )
        );

        // Обработка нажатий кнопок
        this.bot.action(/(.+)/, (ctx) => {
            const buttonCallback = ctx.match[1];
            console.log(`Нажата кнопка с callback: ${buttonCallback}`);
            ansCallBack = buttonCallback;
            console.log(ansCallBack);
            // callback(ansCallBack);
        });

        return ansCallBack;
    }

    // buildMessage(options: { buttons: { callback: string; text: string }[]; text: string }, ctx: IBotContext): string {
    //     //реакиця бота на начало диалога
    //
    //
    //     ctx.reply(
    //         options.text, //текст, который мы передали
    //         Markup.inlineKeyboard( //кнопкаи, которые мы передали
    //         options.buttons.map((button) =>
    //             Markup.button.callback(button.text, button.callback),
    //         ),
    //     ));
    //
    //     //обрабатываем любое нажатие на кнопку
    //     this.bot.action(/(.+)/, (ctx) => {
    //         const callback = ctx.match[1]; // Получаем callback из совпадения
    //         console.log(`Нажата кнопка с callback: ${callback}`);
    //         this.ansCallBack = callback;
    //         console.log(this.ansCallBack);
    //         console.log(ctx)
    //     });
    //
    //
    //     // console.log(this.pressedButton);
    //     // return <string>this.pressedButton;
    //
    //     return this.ansCallBack;
    // }
}
