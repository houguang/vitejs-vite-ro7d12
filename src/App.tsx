import { Card } from '@arco-design/web-react';
import './App.css';
import { fakerZH_CN as faker } from '@faker-js/faker';
import { useEffect } from 'react';
import { z } from 'zod';

const fakerGroup = {
  header: '字符串/UUID等',
  name: 'string',
  extra: 'string',
  items: [
    {
      name: 'UUID',
      funName: 'string.uuid',
      tips: '生成随机UUID',
      args: {
        type: z.undefined(),
      },
    },
    {
      name: 'Nano ID',
      funName: 'string.nanoid',
      tips: '生成随机Nano ID',
      args: {
        type: z.union([
          z.number().int().min(1),
          z.object({
            min: z.number().int().min(1),
            max: z.number().int().min(1),
          }),
          z.undefined(),
        ]),
        default: {
          number: 10,
          object: {
            min: 10,
            max: 20,
          },
          undefined: undefined,
        },
        tips: 'Nano ID长度',
      },
    },
  ],
};

function App() {
  useEffect(() => {
    const schema = fakerGroup.items[1].args.type;
    const args = {
      min: 1,
      max: 20,
    };
    const args1 = 12;
    const args2 = undefined;
    const args3 = {};
    const validated = schema.parse(args);
    const validated1 = schema.parse(args1);
    const validated2 = schema.parse(args2);

    try {
      const v = schema.parse(args3);
      console.log('v3', v);
    } catch (e: any) {
      console.log('v3', '验证失败', e.issues[0].message);
    }

    console.log(validated, validated1, validated2);

    console.log(faker.phone.number(), 123);
  }, []);

  return <Card>1111</Card>;
}

export default App;
