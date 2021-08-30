using UnityEngine;

namespace Platformer.Core
{
    /// <summary>
    /// Fuzzy provides methods for using values +- an amount of random deviation, or fuzz.
    /// </summary>
    static class Fuzzy
    {
        public static bool ValueLessThan(float value, float test, float fuzz = 0.1f)
        {
            var delta = value - test;
            return delta < 0 ? true : Random.value > delta / (fuzz * test);
        }

        public static bool ValueGreaterThan(float value, float test, float fuzz = 0.1f)
        {
            var delta = value - test;
            return delta < 0 ? Random.value > -1 * delta / (fuzz * test) : true;
        }

        public static bool ValueNear(float value, float test, float fuzz = 0.1f)
        {
            return Mathf.Abs(1f - (value / test)) < fuzz;
        }

        public static float Value(float value, float fuzz = 0.1f)
        {
            return value + value * Random.Range(-fuzz, +fuzz);
        }
    }
}