def get_digits(n:int) -> list:
    """
    input a integer n
    return a list consisted of the digits of n in reversed order
    """
    digits = []
    while n:
        digits.append(n%10)
        n = n//10
    return digits

def digits_to_int(l:list) -> int:
    """
    input a list l
    return a integer n equals to sum(l[i]*10**(len(l)-1-i))
    """
    r = 0
    while l:
        r = 10*r + l.pop()
    return r