import { Command } from "./command.class";
import { Markup, Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";


interface UserSessionData {
    questionIndex: number;
    // Другие свойства состояния, если есть
}


// Структура передачи вопроса - ответов
interface QuestionOptions {
    questionText: string; // текст сообщения
    buttonTexts: string[]; // текст кнопок

}

export class QuestionCommand extends Command {
    private readonly questionText: string;
    private readonly buttonTexts: string[];
    // private questionIndex: number; // Добавьте questionIndex как свойство класса

    constructor(bot: Telegraf<IBotContext>, options: QuestionOptions) {
        super(bot);
        this.questionText = options.questionText;
        this.buttonTexts = options.buttonTexts;
        // this.questionIndex = options.questionIndex; // Инициализируйте questionIndex
    }

    handle(): void {
        // this.bot.command("start", (ctx) => {
        //     // Инициализируем состояние пользователя
        //     ctx.session = { questionIndex: 0 } as UserSessionData;
        //     this.askQuestion(ctx);
        // });
        //
        // this.bot.action("answer_\\d+", (ctx) => {
        //     const answerIndex = parseInt(ctx.match[0].substring("answer_".length));
        //
        //     // Обрабатываем ответ
        //     // Здесь вы можете сохранить ответ пользователя или выполнять другую логику
        //
        //     // Увеличиваем индекс вопроса
        //     ctx.session.questionIndex++;
        //
        //     if (ctx.session.questionIndex < this.buttonTexts.length) {
        //         this.askQuestion(ctx);
        //     } else {
        //         ctx.reply("Спасибо за ответы!");
        //     }
        // });

        this.bot.command("askquestion", (ctx) => {
            ctx.reply(this.questionText, Markup.inlineKeyboard(
                this.buttonTexts.map((text, index) =>
                    Markup.button.callback(text, `answer_${index}`)
                )
            ));
        });

        this.bot.action(/answer_\d+/, (ctx) => {
            const answerIndex = parseInt(ctx.match[0].substring("answer_".length));
            ctx.reply(`Вы выбрали: ${this.buttonTexts[answerIndex]}`);
        });
    }

    // private askQuestion(ctx: IBotContext) {
    //     // Используйте this.questionIndex вместо создания новой переменной
    //     ctx.reply(this.buttonTexts[this.questionIndex], Markup.inlineKeyboard([
    //         Markup.button.callback("Вариант 1", "answer_0"),
    //         Markup.button.callback("Вариант 2", "answer_1"),
    //     ]));
    // }
}
