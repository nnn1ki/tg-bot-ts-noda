import {Context} from "telegraf";

//данные сессии - котрые можно отправить в бд
export interface SessionData {
    courseLike: boolean;
}



export interface IBotContext extends Context{
    session: SessionData;
}
