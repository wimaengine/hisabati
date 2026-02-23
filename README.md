# Hisabati

Hisabati is a modular math library for 2D and 3D calculations. It provides vector, matrix, transform, rotation, basis, helper, and constant utilities for spatial work in games, graphics, and simulations.

Import only the parts you need.

## Features

* Vectors

  * 2D, 3D, and 4D vector types
  * Boolean direction vectors for compact axis state
  * Component-wise arithmetic, magnitude, distance, and normalization
  * Dot and cross products, reflection, inversion, and interpolation
  * Direction helpers for axis-aligned and angle-derived vectors

* Matrices

  * 2x2, 3x3, and 4x4 matrix types
  * Identity and zero matrices
  * Transpose, determinant, trace, multiplication, division, and inversion
  * Component-wise arithmetic and equality checks
  * Rotation matrix support for 2D and 3D workflows

* Affines

  * 2D and 3D affine transform types
  * Compose and decompose translation, rotation, and scale
  * Translate, rotate, scale, invert, multiply, and divide transforms
  * Look-at transforms for 2D and 3D targets
  * Transform vectors and convert 3D affines to 4x4 matrices

* Angles and Rotations

  * Scalar angle wrappers for direct numeric storage
  * 2D rotary values based on cosine and sine
  * 3D quaternion rotation values
  * Build rotations from angles, Euler values, matrices, and axis-angle inputs
  * Compare, normalize, interpolate, and transform with rotations

* Bases

  * 2D and 3D basis frames
  * Store the primary axes for orientation tracking
  * Useful for representing right, up, forward, and related directional frames

* Standalone Math Helpers

  * Clamp and step helpers for numeric ranges
  * Linear interpolation, inverse interpolation, and remapping
  * Smooth-step easing functions
  * Index-to-coordinate mapping in 2D and 3D
  * General math helpers for power, square root, rounding, wrapping, and inversion
  * Pairing helpers and approximate equality checks
  * Random number helpers

* Constants

  * Standard math constants and conversion factors
  * Pi, tau, half-pi, quarter-pi, degree-radian conversion, and related values

## Usage

TODO: Make the guide to using this.

## API References

TODO: Link to the docs

## Design Principles

* **Explicit primitives**: small, well-defined numeric types instead of implicit state
* **Composable operations**: vectors, matrices, rotations, and transforms interoperate cleanly
* **Predictable behavior**: direct mathematical semantics with optional in-place variants
* **Spatial correctness**: APIs align with standard 2D/3D coordinate system expectations

## Examples

TODO: Actually add real use cases

## Contributing

TODO: Create a contribution guide and a CLA

## Notes

* All angles are in **radians**
* The library uses a **right-handed** coordinate system
* Matrix and affine layouts follow the component ordering documented in the source
* The library follows standard units where applicable
