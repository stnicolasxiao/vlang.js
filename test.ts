import { parse } from './src/main'
import {run} from './src/rt'
import fs from 'fs'

const code: string = fs.readFileSync('./tests/hello.v', 'utf-8')

const node = parse(code)

console.log(node.toString())

run(node)
