import * as exposed from '../index';
import AbstractScale from '../scales/AbstractScale';
import D3ScaleIdentity from '../scales/ScaleIdentity';
import D3ScaleLinear from '../scales/ScaleLinear';
import D3ScaleLogarithmic from '../scales/ScaleLogarithmic';
import D3ScalePower from '../scales/ScalePower';
import D3ScaleRadial from '../scales/ScaleRadial';
import D3ScaleSymLog from '../scales/ScaleSymLog';
import D3ScaleTime from '../scales/ScaleTime';
import ScaleUtc from '../scales/ScaleUtc';
import D3ScaleOrdinal from '../scales/ScaleOrdinal';
import D3ScalePoint from '../scales/ScalePoint';
import ScaleBand from '../scales/ScaleBand';
import D3ScaleDiverging from '../scales/ScaleDiverging';
import ScaleDivergingLogarithmic from '../scales/ScaleDivergingLogarithmic';
import ScaleDivergingPower from '../scales/ScaleDivergingPower';
import ScaleDivergingSqrt from '../scales/ScaleDivergingSqrt';
import ScaleDivergingSymLog from '../scales/ScaleDivergingSymLog';
import D3ScaleSequential from '../scales/ScaleSequential';
import ScaleSequentialLogarithmic from '../scales/ScaleSequentialLogarithmic';
import ScaleSequentialPower from '../scales/ScaleSequentialPower';
import ScaleSequentialSqrt from '../scales/ScaleSequentialSqrt';
import ScaleSequentialSymLog from '../scales/ScaleSequentialSymLog';
import D3ScaleThreshold from '../scales/ScaleThreshold';
import D3ScaleQuantize from '../scales/ScaleQuantize';
import D3ScaleQuantile from '../scales/ScaleQuantile';

import {
  Animation,
  animate,
  animationMap,
  getEasingFunction,
} from '../animation';

import Axis from '../axis';
import { Position } from '../types';

describe('Core', () => {
  describe('Scale', () => {
    it('Exposes ScaleIdentity class', () => {
      expect(exposed).toHaveProperty('ScaleIdentity');
      expect(new exposed.ScaleIdentity()).toBeInstanceOf(D3ScaleIdentity);
      expect(new exposed.ScaleIdentity()).toBeInstanceOf(AbstractScale);
    });

    it('Exposes ScaleLinear class', () => {
      expect(exposed).toHaveProperty('ScaleLinear');
      expect(new exposed.ScaleLinear()).toBeInstanceOf(D3ScaleLinear);
      expect(new exposed.ScaleLinear()).toBeInstanceOf(AbstractScale);
    });

    it('Exposes ScaleLogarithmic class', () => {
      expect(exposed).toHaveProperty('ScaleLogarithmic');
      expect(new exposed.ScaleLogarithmic()).toBeInstanceOf(
        D3ScaleLogarithmic
      );
      expect(new exposed.ScaleLogarithmic()).toBeInstanceOf(AbstractScale);
    });

    it('Exposes ScalePower class', () => {
      expect(exposed).toHaveProperty('ScalePower');
      expect(new exposed.ScalePower()).toBeInstanceOf(D3ScalePower);
      expect(new exposed.ScalePower()).toBeInstanceOf(AbstractScale);
    });

    it('Exposes ScaleRadial class', () => {
      expect(exposed).toHaveProperty('ScaleRadial');
      expect(new exposed.ScaleRadial()).toBeInstanceOf(D3ScaleRadial);
      expect(new exposed.ScaleRadial()).toBeInstanceOf(AbstractScale);
    });

    it('Exposes ScaleSymLog class', () => {
      expect(exposed).toHaveProperty('ScaleSymLog');
      expect(new exposed.ScaleSymLog()).toBeInstanceOf(D3ScaleSymLog);
      expect(new exposed.ScaleSymLog()).toBeInstanceOf(AbstractScale);
    });

    it('Exposes ScaleTime class', () => {
      expect(exposed).toHaveProperty('ScaleTime');
      expect(new exposed.ScaleTime()).toBeInstanceOf(D3ScaleTime);
      expect(new exposed.ScaleTime()).toBeInstanceOf(AbstractScale);
    });

    it('Exposes ScaleUtc class', () => {
      expect(exposed).toHaveProperty('ScaleUtc');
      expect(new exposed.ScaleUtc()).toBeInstanceOf(ScaleUtc);
      expect(new exposed.ScaleUtc()).toBeInstanceOf(AbstractScale);
    });

    it('Exposes ScaleOrdinal class', () => {
      expect(exposed).toHaveProperty('ScaleOrdinal');
      expect(new exposed.ScaleOrdinal()).toBeInstanceOf(D3ScaleOrdinal);
      expect(new exposed.ScaleOrdinal()).toBeInstanceOf(AbstractScale);
    });

    it('Exposes ScalePoint class', () => {
      expect(exposed).toHaveProperty('ScalePoint');
      expect(new exposed.ScalePoint()).toBeInstanceOf(D3ScalePoint);
      expect(new exposed.ScalePoint()).toBeInstanceOf(AbstractScale);
    });

    it('Exposes ScaleBand class', () => {
      expect(exposed).toHaveProperty('ScaleBand');
      expect(new exposed.ScaleBand()).toBeInstanceOf(ScaleBand);
      expect(new exposed.ScaleBand()).toBeInstanceOf(AbstractScale);
    });

    it('Exposes ScaleDiverging class', () => {
      expect(exposed).toHaveProperty('ScaleDiverging');
      expect(new exposed.ScaleDiverging()).toBeInstanceOf(D3ScaleDiverging);
      expect(new exposed.ScaleDiverging()).toBeInstanceOf(AbstractScale);
    });

    it('Exposes ScaleDivergingLogarithmic class', () => {
      expect(exposed).toHaveProperty('ScaleDivergingLogarithmic');
      expect(new exposed.ScaleDivergingLogarithmic()).toBeInstanceOf(
        ScaleDivergingLogarithmic
      );
      expect(new exposed.ScaleDivergingLogarithmic()).toBeInstanceOf(
        AbstractScale
      );
    });

    it('Exposes ScaleDivergingPower class', () => {
      expect(exposed).toHaveProperty('ScaleDivergingPower');
      expect(new exposed.ScaleDivergingPower()).toBeInstanceOf(
        ScaleDivergingPower
      );
      expect(new exposed.ScaleDivergingPower()).toBeInstanceOf(
        AbstractScale
      );
    });

    it('Exposes ScaleDivergingSqrt class', () => {
      expect(exposed).toHaveProperty('ScaleDivergingSqrt');
      expect(new exposed.ScaleDivergingSqrt()).toBeInstanceOf(
        ScaleDivergingSqrt
      );
      expect(new exposed.ScaleDivergingSqrt()).toBeInstanceOf(
        AbstractScale
      );
    });

    it('Exposes ScaleDivergingSymLog class', () => {
      expect(exposed).toHaveProperty('ScaleDivergingSymLog');
      expect(new exposed.ScaleDivergingSymLog()).toBeInstanceOf(
        ScaleDivergingSymLog
      );
      expect(new exposed.ScaleDivergingSymLog()).toBeInstanceOf(
        AbstractScale
      );
    });
    it('Exposes ScaleSequential class', () => {
      expect(exposed).toHaveProperty('ScaleSequential');
      expect(new exposed.ScaleSequential()).toBeInstanceOf(D3ScaleSequential);
      expect(new exposed.ScaleSequential()).toBeInstanceOf(AbstractScale);
    });

    it('Exposes ScaleSequentialLogarithmic class', () => {
      expect(exposed).toHaveProperty('ScaleSequentialLogarithmic');
      expect(new exposed.ScaleSequentialLogarithmic()).toBeInstanceOf(
        ScaleSequentialLogarithmic
      );
      expect(new exposed.ScaleSequentialLogarithmic()).toBeInstanceOf(
        AbstractScale
      );
    });

    it('Exposes ScaleSequentialPower class', () => {
      expect(exposed).toHaveProperty('ScaleSequentialPower');
      expect(new exposed.ScaleSequentialPower()).toBeInstanceOf(
        ScaleSequentialPower
      );
      expect(new exposed.ScaleSequentialPower()).toBeInstanceOf(
        AbstractScale
      );
    });

    it('Exposes ScaleSequentialSqrt class', () => {
      expect(exposed).toHaveProperty('ScaleSequentialSqrt');
      expect(new exposed.ScaleSequentialSqrt()).toBeInstanceOf(
        ScaleSequentialSqrt
      );
      expect(new exposed.ScaleSequentialSqrt()).toBeInstanceOf(
        AbstractScale
      );
    });

    it('Exposes ScaleSequentialSymLog class', () => {
      expect(exposed).toHaveProperty('ScaleSequentialSymLog');
      expect(new exposed.ScaleSequentialSymLog()).toBeInstanceOf(
        ScaleSequentialSymLog
      );
      expect(new exposed.ScaleSequentialSymLog()).toBeInstanceOf(
        AbstractScale
      );
    });
    it('Exposes ScaleThreshold class', () => {
      expect(exposed).toHaveProperty('ScaleQuantize');
      expect(new exposed.ScaleThreshold()).toBeInstanceOf(D3ScaleThreshold);
      expect(new exposed.ScaleThreshold()).toBeInstanceOf(AbstractScale);
    });
    it('Exposes ScaleQuantize class', () => {
      expect(exposed).toHaveProperty('ScaleQuantize');
      expect(new exposed.ScaleQuantize()).toBeInstanceOf(D3ScaleQuantize);
      expect(new exposed.ScaleQuantize()).toBeInstanceOf(AbstractScale);
    });
    it('Exposes ScaleQuantile class', () => {
      expect(exposed).toHaveProperty('ScaleQuantile');
      expect(new exposed.ScaleQuantile()).toBeInstanceOf(D3ScaleQuantile);
      expect(new exposed.ScaleQuantile()).toBeInstanceOf(AbstractScale);
    });
  });

  describe('Animation', () => {
    it('Exposes Animation class', () => {
      expect(exposed).toHaveProperty('Animation');
      expect(
        new exposed.Animation(
          0,
          1,
          undefined,
          (_v) => {},
          undefined,
          (t) => t
        )
      ).toBeInstanceOf(Animation);
    });

    it('Exposes ScaleDivergingSymLog function', () => {
      expect(exposed).toHaveProperty('animate');
      expect(exposed.animate).toBe(animate);
    });

    it('Exposes getEasingFunction function', () => {
      expect(exposed).toHaveProperty('getEasingFunction');
      expect(exposed.getEasingFunction).toBe(getEasingFunction);
    });

    it('Exposes animationMap singleton', () => {
      expect(exposed).toHaveProperty('animationMap');
      expect(exposed.animationMap).toBe(animationMap);
    });
  });

  describe('Axis', () => {
    it('Exposes Axis class', () => {
      expect(exposed).toHaveProperty('Axis');
      expect(
        new exposed.Axis(Position.LEFT, new D3ScaleLinear().scale)
      ).toBeInstanceOf(Axis);
    });
  });
});
