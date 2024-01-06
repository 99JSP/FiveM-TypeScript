interface CarPayload {
  type: 'spawn' | 'clean' | 'fix' | 'seat' | 'delete';
  model?: 'string';
  vehicle?: 'last' | number;
  safeSpawn?: boolean;
  varit?: [
    {
      rgb: {
        r: number;
        g: number;
        b: number;
      };
    },
    {
      rgb: {
        r: number;
        g: number;
        b: number;
      };
    }
  ];
}

export {CarPayload}