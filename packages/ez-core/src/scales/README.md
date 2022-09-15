# Scales
Scales are meant to translate [d3-scale](https://github.com/d3/d3-scale) into a configurable scale classes, so they can be easily used by eazychart's renderes.

Each scale class and its config is typescript compliant.

All Scales support methods to update configuration and can compute a [d3-scale](https://github.com/d3/d3-scale) depending or not of charts data and its available space (dimensions).
## Scale types
### Continous Scales
- Linear
- Power
- Logarithmic
- Radial
- Time
### Diverging Scales
- Linear
- Power
- Logarithmic
### Categorical Scales
- Ordinal
- Point
- Band
### Sequential Scales
- Linear
- Power
- Logarithmic
- Quantile $$Not Yet Implemented$$

### Threshold Like Scales
- Threshold 
- Quantize
- Quantile

## Known issues (to be solved)
### @types/d3-scales
- It lacks typing for composed scale type (e.g: DivergingLog, SequentialPow).
- Contains methods overriding conflicts as d3 uses same method names for setters and getters (e.g: `scale.domain([0, 1])` and `scale.domain()`).

**N.B:** Redeclaring `@types/d3-scale` based on the current would serve better the scales lib.
### Inheritance
- There are multiples opportunities that classes inherit from each other, these inheritances were avoided in purpose until the full scope of the scales is implemented. Only the most obvious scales take advantage of the inheritance for now.
- Scale types also seems to be better using inheritance, which will also be addressed once the full scope is implemented.

## Perspectives (enhancements)
- Interpolators were not taking into account, theses offers further more costumization when it comes to creating the scale mapping
- ScaleBand and ScalePoint uses a proxy to be able to provide `unknown` config option, turning all scales to proxies would make the scales more look the same.
- `unknown` config option acts on the output while we usually do not know the extent of the range, an `unknownInput` would be also helpful as it helps to clean data and results on values inside the range. This can be added via the proxies mentionned above.
- tests on the ContinuousScaleHelpers need to be more precise , domain better be containing more than two numbers.
- definitions on types.ts need to be changed to genreic types <T>.
- More normalization to config options can also be done (invert, proxies...).
