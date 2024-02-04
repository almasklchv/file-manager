import { cpus } from "os";

export function getCPUInfo() {
  const cpuInfo = cpus().map((cpu) => ({
    model: cpu.model,
    speed: `${cpu.speed / 1000} GHz`,
  }));

  console.log(`Total CPUs: ${cpuInfo.length}`);
  console.table(cpuInfo);
}
