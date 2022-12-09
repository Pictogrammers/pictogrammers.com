import getRandomArrayValues from './helpers/getRandomArrayValues';

import { IContributor } from '../types/contributor';

const API_BASE = 'https://dev.materialdesignicons.com/api';

export const getContributors = async (total?: number) => {
  const genericImage = 'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAA2FBMVEUAAAB+V8J/WMKAWcOBWsOBW8OCXMSDXcSEX8WFYMWGYcaGYsaHY8aIZMeJZceKZsiLZ8iLaMiNa8mObMqPbcqQb8uRb8uXeM6Yec6bfdCegdGkidSojtaqkNesktixmtqznNu4ot2+quC+q+DAreHCr+LCsOLJuebLvOfQwunWyevWyuzYzO3azu3az+7b0O7h1/Hi2fHj2vLj2/Ll3fPp4vTp4/Xs5/bt6Pfu6ffv6/jw7Pjy7/nz8Pn08fr29Pv39Pv6+P37+v38+/78/P79/P7+/v////9zKY31AAABZUlEQVR42u3WW1OCQBjG8TZPUYGlEhpoecAo0/KMlQcUeb//N8oVAaeRK3acLp7n7u9e/GYY2eGCnWFAgAABAgQIECBAgAABAgRIUkRuT5YzSw1StWbLSVsWi5TnxLc2/DTW+5yXRSLygvxtyntyc8iFLBAxKViPZy9MUyAypmBulrGsG+ZYILKicAXGClGtBCI2BfMkxiQvTFsgYlGwAc9BmJZARHXoMJ2nHpSjCkRY9fCnbfrZ9GtTFfvGa12XvKEepD70yO1qwu+uXFE6TqmYwy0cv7RSustGmbkvKWmhiFbvTLf8Tfz6aDymGN/VO9F22qlrYhClZdPxFi8P/OfUm592S0mMZEyH/s57vd2dXAe2Y2aSIfkRndo3f0pPYY7ySZDLPp3ezw1jOTfM/mUCpEJxe96dTqOsJEBqsUh7d/oZZQ3IuRBjGbcG/2iJ0sAtDAQIECBAgAABAgQIECBA/i/yC65GvcXs6q8cAAAAAElFTkSuQmCC';

  try {
    const res = await fetch(`${API_BASE}/user`);

    if (!res.ok) {
      console.error('ERROR: Unable to retrieve contributor listing.');
      return;
    }

    const contributors = await res.json();

    if (!contributors.length) {
      return [];
    }

    const filteredContributors = contributors.filter((contributor: IContributor) => contributor.base64 !== genericImage);

    return getRandomArrayValues(filteredContributors, total || filteredContributors.length);
  } catch (err) {
    console.error(`ERROR: ${err}`);
  }
};
