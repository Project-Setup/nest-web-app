const loadEnvByKey = (...keys: string[]) => () =>
  keys.reduce<Record<string, string>>(
    (env, key) => ({
      ...env,
      [key]: process.env[key],
    }),
    {}
  );

export default loadEnvByKey;
