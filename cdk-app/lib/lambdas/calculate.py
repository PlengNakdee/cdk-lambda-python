import math

def handler(event, context):
    # mFlow : Mass flow                     [kg/s]
    # D     : Inner diameter of the pipe    [mm]
    # T     : Temperature of the water      [°C]
    # P     : Hydraulic Static Pressure     [bar]

    pi_number = 4 * math.atan(1)
    reynolds = 4 * event['mFlow'] / pi_number * (event['D']/1000) * event['P']
    return {
        'reynolds' : reynolds
        }

# cal_reynolds(100, 20, 140, 2)

# Test input
# {
#     "mFlow": 100,
#     "D": 20,
#     "P": 2
# }