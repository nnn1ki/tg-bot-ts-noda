import {Command} from "./command.class";
import {Markup, Telegraf} from "telegraf";
import {IBotContext} from "../context/context.interface";
import { MessageBuilder } from "../MessageBuilder";
import {callback} from "telegraf/typings/button";


//описываем структуру сообщений бота
export interface MessageOptions extends ButtonOption{
    text: string; // Текст сообщения
    buttons: ButtonOption[]; // Массив кнопок
}

//для создания кнопки
export interface ButtonOption {
    text: string; // Текст кнопки
    callback: string; // Callback данные для кнопки
}



export class StartCommand extends Command {
    private messageBuilder: MessageBuilder; //сообщения, которые разворачивает класс

    constructor(bot: Telegraf<IBotContext>) {
        super(bot);
        this.messageBuilder = new MessageBuilder(bot);
    }


    handle(): void {

        this.bot.start((ctx) => {

            console.log(ctx.session);
            //чтобы что-то ответить мы должны использовать контекст
            //реплаем на сообщение
            //markup - разметка
            ctx.reply("Рад приветствовать тебя! Я тут, чтобы ответить на твои вопросы! Из какого ты региона?", Markup.inlineKeyboard([
               Markup.button.callback("Иркутск", "irkutsk"), //кнопки, которые наживает пользователь
               Markup.button.callback("Иркутская обл.", "irkRegion"),
            ])
            );


        });

        //реакция на нажатие кнопки -
        this.bot.action("irkutsk", (ctx) => {

            const varMessage: { buttons: ({ callback: string; text: string })[]; text: string } = {
                text: "Нужно еще дать пару ответов",
                buttons: [
                    { text: "Вариант 1", callback: "var1" },
                    { text: "Вариант 2", callback: "var2" },
                ],
            };

            const regionMessage: { buttons: ({ callback: string; text: string })[]; text: string } = {
                text: "Из какого Вы региона? ",
                buttons: [
                    { text: "Регион 1", callback: "var1" },
                    { text: "Регион 2", callback: "var2" },
                    { text: "Регион 3", callback: "var3" },
                    { text: "Регион 4", callback: "var4" },
                ],
            };

            this.messageBuilder.buildMessage(varMessage, ctx);
            console.log("Вызов класса для создания сообщения и вот его ответ");
            // const messageBuilder = new MessageBuilder(this.bot);
            //
            // this.messageBuilder.buildMessage(this.bot, ctx, (ansCallBack) => {
            //     // В этом месте ansCallBack содержит правильное значение
            //     console.log(`Значение ansCallBack: ${ansCallBack}`);
            //     // Вы можете выполнять дополнительную логику с ansCallBack
            // });




            // if(ans === 'var1') {
            //     console.log("Принято значение")
            //     console.log(ans)
            //
            //     this.messageBuilder.buildMessage(regionMessage, ctx);
            // }
            //
            // else if(ans === 'var2') {
            //     console.log("Принято значение")
            //     console.log(ans)
            //
            //     console.log('Пользователь нажал на кнопку Регион!!!')
            // }

            // ctx.session.courseLike = true;
            //редакция предыдущего сообщения
            // ctx.editMessageText("Иркутск");


            // ctx.reply("Из какого ты региона?", Markup.inlineKeyboard([
            //         [Markup.button.callback("Лененский", "LeninRegion")],
            //         [Markup.button.callback("Академический", "AkademRegion")],
            //         [Markup.button.callback("Свердловский", "SverdlRegion")],
            //         [Markup.button.callback("Центр", "CenterRegion")],
            //
            //     ])
            // );
            //
            // ctx.reply("Это нужно для предоставления нужной информации");
            //
            // //реакция на район города
            // this.bot.action("LeninRegion", (ctx) => {
            //     // const dataAns = ctx.inlineQuery().data;
            //     // console.log(dataAns);
            //
            //     // ctx.editMessageText("Лененский");
            // });
            //
            // this.bot.action("AkademRegion", (ctx) => {
            //     ctx.reply("Можем предложить сделать страховку");
            //     // ctx.editMessageText("Академический");
            // });
            //
            // this.bot.action("SverdlRegion", (ctx) => {
            //     ctx.reply("Тут мы можем оформить пособие");
            //     // ctx.editMessageText("Свердловский");
            // });
            //
            // this.bot.action("CenterRegion", (ctx) => {
            //     ctx.reply("В данном регионе возможно оформить выплаты");
            //     // ctx.editMessageText("Центр");
            // });


        })

        this.bot.action("irkRegion", (ctx) => {
            //todo - данные можно оправить в сессию пользователя
            // ctx.session.courseLike = false;
            ctx.reply("Раздел ещзе в разработке");
            // ctx.editMessageText("Иркутская область");
        })

    }

}