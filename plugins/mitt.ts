import mitt from 'mitt'
import Title from "~/intrerfaces/title.interface";
import Path from "~/intrerfaces/path.interface";



type ApplicationEvents = {
    'set:title': Title,
    'set:path': Path
};

export default defineNuxtPlugin(() => {
    const emitter = mitt<ApplicationEvents>()

    return {
        provide: {
            event: emitter.emit,
            listen: emitter.on
        }
    }
})
