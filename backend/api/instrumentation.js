import { NodeSDK } from '@opentelemetry/sdk-node';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { OTLPTraceExporter } from
  '@opentelemetry/exporter-trace-otlp-http';
import { getNodeAutoInstrumentations } from
  '@opentelemetry/auto-instrumentations-node';

const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    'service.name': 'express-api',
    'deployment.environment.name':
      process.env.NODE_ENV ?? 'development',
  }),
  traceExporter: new OTLPTraceExporter({
    url: 'http://localhost:4318/v1/traces',
  }),
  instrumentations: [
    getNodeAutoInstrumentations(),
  ],
});

sdk.start();

process.once('SIGTERM', () => {
  void sdk.shutdown();
});