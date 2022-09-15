# Axis
Axis is meant to translate [d3-axis](https://github.com/d3/d3-axis) into a configurable class, and instead of instantly rendering to d3-selection. It just returns an object containing details about how the axis can be rendered.


## Perspectives (enhancements)
Since the axis always returns an object when it's method `axis` is called, we can just add that returned object as a member to the class and have be computed each time the class mutate.
