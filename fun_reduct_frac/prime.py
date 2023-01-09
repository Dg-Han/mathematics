import math

prime_list = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
              31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
              73, 79, 83, 89, 97]
try:
    with open("prime.txt", "r", encoding="utf-8") as f:
        plain_text = f.readlines()
        plain_text_list = plain_text.split("\n")
        for prime_text in plain_text_list:
            prime_list.extend([int(_) for _ in prime_text.split(",")])
except:
    pass

def judge_prime(n:int) -> bool:
    """
    input a number n,
    return whether n is a prime
    """
    i = 2
    while i <= int(math.sqrt(n)):
        if n % i:
            i += 1
        else:
            return False
    return True

def Eratosthenes(n:int) -> bool:
    """
    素数筛 (the Sieve of Eratosthenes)
    input a number n and given a whole sorted prime list which the square of maximum greater than n,
    return whether n is a prime
    """
    global prime_list
    if (judge_valid_prime_list(prime_list)) and (max(prime_list)**2 >= n):
        for p in prime_list:
            if not n % p:
                return False
        prime_list.append(n)
        return True
    else:
        return judge_prime(n)

def judge_valid_prime_list(l:list) -> bool:
    """
    判断质数表是否完整
    抽样判断: 第25个质数为97, 第168个质数为997, 第1229个质数为9973
    """
    if ((l[24] if len(l)>24 else 97) == 97) and ((l[167] if len(l)>167 else 997) == 997) and ((l[1228] if len(l)>1228 else 9973) == 9973):
        return True
    else:
        return False

def format_output(l:list[str], n:int =10) -> str:
    """
    格式化输出
    输入字符串列表，返回以逗号为分隔，n个元素换行的标准字符串
    """
    cache = []
    for i in range((len(l)-1)//n + 1):
        cache.append(", ".join(l[n*i : n*(i+1)]))
    return "\n".join([cache])

def get_p_factors(n:int) -> list:
    """
    质因数分解
    input a integer n
    return a list consisted of prime number which product equals to n
    """
    p_factors = []
    if (judge_valid_prime_list(prime_list)) and (max(prime_list)**2 >= n):
        i = 0
        while (n > 1) and (i < len(prime_list)):
            while not n % prime_list[i]:
                p_factors.append(prime_list[i])
                n = n // prime_list[i]
            i += 1

    else:
        p = 2
        while n > 1:
            while not n % p:
                p_factors.append(p)
                n = n // p
            p += 1
            if p**2 > n:
                break

    if n > 1:
        p_factors.append(n)
    return p_factors

'''
if __name__ == "__main__":
    result = []
    for _ in range(2, 10**9):
        if Eratosthenes(_):
            result.append(_)
            print(_)
    with open("prime.txt", "w", encoding="utf-8") as f:
        f.write(format_output([str(_) for _ in result]))
'''
