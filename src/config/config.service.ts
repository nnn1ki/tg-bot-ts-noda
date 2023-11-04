import * as dotenv from 'dotenv';
import { DotenvParseOutput} from "dotenv";
import { IConfigService } from "./config.interface";
import config from "eslint-config-standard-with-typescript";

//конфиг сервис, который читает файл и возвращаем нужное значение


export class ConfigService implements IConfigService {
    config : DotenvParseOutput; //взять файлик и получить ключи и значения

    constructor() {
        const result = dotenv.config();
        if (result.error) {
            throw new Error('НЕ найден файл .env' + result.error.message);
        }

        if (!result.parsed) {
            throw new Error('Пустой файл .env' + result.parsed);
        }

        this.config = result.parsed;
    }


    get(key: string): string {
        const res = this.config[key];
        if (!res) {
            throw new Error('Нет такого ключа');
        }
        return res;
    }

}