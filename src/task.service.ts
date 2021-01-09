import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
const xlsx = require('node-xlsx');
const fs = require('fs');
@Injectable()
export class TaskService {
    async getStock() {
        const url = `http://quotes.money.163.com/f10/zycwzb_600519.html#01c01`;
        const res = await axios.get(url);
        const $ = cheerio.load(res.data);
        let tdStr = $('.col_r .table_bg001  tbody tr:nth-child(12)').html()
        let reg = /<td[\S\s]*?>([\S\s]*?)<\/td>/gi;
        let result = [];
        let i
        while ((i = reg.exec(tdStr)) != null) {
            result.push(i[1].replace('\n', ''));
        }
        let datas = []
        let title = ['茅台净利润(万元)']

        datas = [title, result]
        this.writeToExcel(title[0] + this.toLocaleDateString(), datas);
        return;
    }
    writeToExcel(name, data) {
        console.log(name, data)
        var buffer = xlsx.build([{ name: 'sheet1', data: data }]);
        fs.writeFileSync(name + '.xlsx', buffer, { 'flag': 'w' });
    }
    toLocaleDateString() {
        return new Date().toLocaleDateString();
    }

}