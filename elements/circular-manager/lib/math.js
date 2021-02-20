// math
import { curry} from 'ramda'
export const polarToCartesian = (angle, radius, btnRadius) => {
  const hC = radius + btnRadius;
  const a = (angle-90) * Math.PI / 180.0;

  const x = hC + (radius * Math.cos(a));
  const y = hC + (radius * Math.sin(a));
  return {x, y};
}

export const getRelativeValue = max => angle => Math.round((max * angle) / 360);
export const getRelativeDegree = max => value => Math.round((value * 360) / max);

export const getAngleDegree = curry(({locationX = 0, locationY = 0}, radius) => {
  const x = locationX.toFixed(2);
  const y = locationY.toFixed(2);
  const dx = x - radius;
  const dy = y - radius;
  const angle = Math.atan2(dy, dx) * 180 / Math.PI + 90;
  return  (angle < 0) ? 360 + angle : angle;
})