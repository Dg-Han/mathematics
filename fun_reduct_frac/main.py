from prime import get_p_factors
from digits import get_digits, digits_to_int
import itertools

def get_inter(l1:list, l2:list) -> list:
    """
    求两个列表的重复元素
    """
    L1 = l1[:]
    L2 = l2[:]
    i = 0
    inter_list = []
    while i < len(L1):
        if L1[i] in L2:
            inter_list.append(L1[i])
            L2.remove(L1[i])
            L1.pop(i)
        else:
            i += 1
    return inter_list

def mul(l:list) -> int:
    n = 1
    for p in l:
        n *= p
    return n

def get_sub_all_frac(m_digits:list, n_digits:list, sub_digits:list) -> list[tuple] | tuple[list, 2]:
    """
    返回 m / n 错约后所有可能分子和分母的列表
    注释行返回为所有可能的错约分数（错约分数为直接约去分子分母中相同的数字的结果）
    """
    m_index_list = [[_ for _ in range(len(m_digits)) if (m_digits[_] == i)] for i in range(10)]
    n_index_list = [[_ for _ in range(len(n_digits)) if (n_digits[_] == i)] for i in range(10)]

    m_del_index_list = []
    n_del_index_list = []
    
    for i in range(10):
        m_del_index_i_list = list(itertools.combinations(m_index_list[i], sub_digits.count(i)))
        n_del_index_i_list = list(itertools.combinations(n_index_list[i], sub_digits.count(i)))
        if m_del_index_i_list != [()]:
            m_del_index_list.append(m_del_index_i_list)
        if n_del_index_i_list != [()]:
            n_del_index_list.append(n_del_index_i_list)
    """
    m_del_index_list = list(itertools.chain([list(itertools.combinations(m_index_list[i], sub_digits.count(i))) for i in range(10) if list(itertools.combinations(m_index_list[i], sub_digits.count(i))) != [()]]))
    n_del_index_list = list(itertools.chain([list(itertools.combinations(n_index_list[i], sub_digits.count(i))) for i in range(10) if list(itertools.combinations(n_index_list[i], sub_digits.count(i))) != [()]]))
    """
    m_del_index_list = list(itertools.product(*m_del_index_list))
    n_del_index_list = list(itertools.product(*n_del_index_list))

    m_result_list = []
    n_result_list = []
    for m_del_index in m_del_index_list:
        m_result_list.append(digits_to_int([m_digits[_] for _ in range(len(m_digits)) if (_ not in list(itertools.chain(*m_del_index)))]))
    for n_del_index in n_del_index_list:
        n_result_list.append(digits_to_int([n_digits[_] for _ in range(len(n_digits)) if (_ not in list(itertools.chain(*n_del_index)))]))

    #return list(itertools.product(m_result_list, n_result_list))
    return m_result_list, n_result_list

def judge_frac_equal(frac1_list:list[tuple[2]], frac2_list:list[tuple[2]]) -> tuple[int, 2] | bool:
    """
    判断两个列表中是否存在数值相等的分数
    """
    for frac1 in frac1_list:
        for frac2 in frac2_list:
            if frac1[0]*frac2[1] == frac1[1]*frac2[0]:
                return (frac1, frac2)
    return False


def judge_fun_frac(m:int, n:int) -> tuple[int, 2] | bool:
    """
    判断分数 m / n 是否为可错约分数
    如果是，返回 m / n 的错约结果（当前代码要求最简分数，注释行则包括非最简分数）
    如果不是，返回 False
    """
    if (not m%10) and (not n%10):       # 若分子分母结尾均为0, 则 (m/10) / (n/10) 也为可错约分数
        return False
    
    m_digits = get_digits(m)
    n_digits = get_digits(n)
    common_digits = get_inter(m_digits, n_digits)

    if (common_digits != []) and (common_digits != m_digits):       # 如果分子分母存在相同的数字，且分子数位不是分母的真子集
        m_factors = get_p_factors(m)
        n_factors = get_p_factors(n)
        common_factor = mul(get_inter(m_factors, n_factors))
        mp = m // common_factor
        np = n // common_factor
        
        m_list, n_list = get_sub_all_frac(m_digits, n_digits, common_digits)
        #sub_frac_list = get_sub_all_frac(m_digits, n_digits, common_digits)
        #if judge_frac_equal([(m//common_factor, n//common_factor)], sub_frac_list):
        if (mp in m_list) and (np in n_list):
            return (mp, np)
    return False

if __name__ == "__main__":
    for n in range(2, 10000):
        for m in range(1, n):
            r = judge_fun_frac(m, n)
            if r:
                with open("fun_frac.txt", "a", encoding="utf-8") as f:
                    f.write(f"{m} {n} {r[0]} {r[1]}\n")
