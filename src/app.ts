import {ConfigService} from "./config/config.service";
import {QuestionCommand} from "./commands/question.command";
import {IConfigService} from "./config/config.interface";
import {session, Telegraf} from "telegraf";
import {IBotContext} from "./context/context.interface";
import {Command} from "./commands/command.class";
import {StartCommand} from "./commands/start.command";
import LocalSession from "telegraf-session-local";
//чтобы протестировать бота с другой конфигурацией, нужчно просто прокинуть другой сервис в этот класс

class Bot {

    bot: Telegraf<IBotContext>; //типизация контекста работы бота
    commands: Command[] = []; //список команд

    constructor(private readonly configService: IConfigService) {
        this.bot = new Telegraf<IBotContext>(this.configService.get('TOKEN'));
        this.bot.use(
            new LocalSession({database: 'sessions.json'}).middleware()
        );

    }

    init() {
        // const questionOptions = {
        //     questionText: "Выберите ваш ответ:",
        //     buttonTexts: ["Вариант 1", "Вариант 2", "Вариант 3"],
        // };
        //
        // const questionCommand = new QuestionCommand(this.bot, questionOptions);



        //проходимся по списку команд
        // мы указываем боту на какие события мы реагируем и как мы это делаем
        this.commands = [new StartCommand(this.bot)];

        for (const command of this.commands) {
            command.handle(); //подключаем нужные команды
        }


        this.bot.launch();
    }
}

const bot = new Bot(new ConfigService());
bot.init();


