import Account from "./Account"
import {Worker, Work} from "./Worker"
import Master from "./Master"
import * as cluster from "cluster"
import * as threads from "threads"

const thread = threads.spawn(function(input, done) {
   done({result: input.number*2});
});

thread.send({number: 10})
    .on('message', function(response) {
       console.log('Response from thread', response);
       if(response.result == 20) {
           thread.send({number: 20});
       }
    });