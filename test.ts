import { parse } from './src/main'
import {generateIlFromFunction, FunctionMgr} from './src/codegen'
import {run} from './src/rt'
import fs from 'fs'

const code: string = fs.readFileSync('./tests/hello.v', 'utf-8')

const node = parse(code)

console.log(node.toString())

let fn=generateIlFromFunction(node)

let funtionDef=FunctionMgr.getInst().getFunction(fn)

run(funtionDef)
