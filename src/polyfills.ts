import 'core-js/es7/reflect';
import 'core-js/client/shim';
import 'zone.js/dist/zone';
import 'ts-helpers';

if (process.env.ENV === 'production') {
    // Production
} else {
    // Development
    Error['stackTraceLimit'] = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}
