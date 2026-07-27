---
title: 简历项目深挖
---
## 你有什么要问我的吗？

### 初面
- 能不能谈谈你作为一个公司老员工对公司的感受？
- 大概什么时候能给我回复？
- 如果通过的话，下一面会在什么时候举行，什么形式？

### 领导面
- 部门的主要人员分配以及对应的主要工作能简单介绍一下吗？
- 站在你的视角看，这个岗位的未来在公司内部发展如何？
- 团队现在面临最大的挑战是什么？
- 项目的迭代周期
- 这个岗位的大概是做什么项目内容

### 老板总裁
- 贵公司的发展目标和方向是什么
- 与同行业竞争者相比，贵公司的核心竞争优势是什么
- 公司现在面临最大的挑战是什么？

### hr面
- 加班
- 政策
- 薪资
- 五险一金
## OA

### redision实现可重复分布式锁保障接口幂等
```xml
<!-- Redisson Spring Boot Starter -->
<dependency>
    <groupId>org.redisson</groupId>
    <artifactId>redisson-spring-boot-starter</artifactId>
    <version>3.16.8</version>
</dependency>
<!-- Spring AOP 依赖 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```
自定义一个幂等注解：
```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Idempotent {

    /**
     * 锁的key，支持占位符 {}
     * 例如： "order_{}_{}" 会替换为方法的前两个参数
     */
    String key() default "";

    /**
     * 锁的过期时间（秒），默认30秒
     * 业务执行时间不应超过此值，否则锁会被自动释放
     */
    long expire() default 30;

    /**
     * 获取锁的等待时间（秒），默认5秒
     * 超过此时间仍未获取到锁，则视为加锁失败
     */
    long waitTime() default 5;
}
```
编写AOP切面：
```java

@Aspect
@Component
public class IdempotentAspect {

    private static final String KEY_PREFIX = "idempotent:lock:";
    private final RedissonClient redissonClient;

    public IdempotentAspect(RedissonClient redissonClient) {
        this.redissonClient = redissonClient;
    }

    @Around("@annotation(idempotent)")
    public Object around(ProceedingJoinPoint joinPoint, Idempotent idempotent) throws Throwable {
        // 1. 生成分布式锁的Key
        String lockKey = generateLockKey(idempotent.key(), joinPoint.getArgs());
        lockKey = KEY_PREFIX + lockKey;

        // 2. 获取可重入锁（RLock）
        RLock lock = redissonClient.getLock(lockKey);

        // 3. 尝试加锁
        boolean acquired = lock.tryLock(idempotent.waitTime(), idempotent.expire(), TimeUnit.SECONDS);

        try {
            if (!acquired) {
                // 获取锁失败，说明有相同请求正在处理
                throw new RuntimeException("操作正在处理中，请勿重复提交");
            }

            // 4. 加锁成功，执行业务方法
            return joinPoint.proceed();

        } finally {
            // 5. 释放锁（仅当锁由当前线程持有时才释放，防止误删）
            if (lock.isHeldByCurrentThread()) {
                lock.unlock();
            }
        }
    }

    /**
     * 根据注解中的key模板和方法参数生成最终的key
     * 例如：key="order_{}_{}", args=[1001, "VIP"] => "order_1001_VIP"
     */
    private String generateLockKey(String keyTemplate, Object[] args) {
        if (keyTemplate == null || keyTemplate.isEmpty()) {
            return "default_key";
        }
        String result = keyTemplate;
        for (Object arg : args) {
            result = result.replaceFirst("\\{\\}", arg == null ? "null" : arg.toString());
        }
        return result;
    }
}
```
使用方法：
```java
@Service
public class OrderService {

    @Idempotent(key = "createOrder_{userId}_{productId}")
    public String createOrder(Long userId, Long productId) {
        // 模拟耗时业务逻辑，如：创建订单、扣减库存等
        System.out.println("处理订单，用户：" + userId + "，商品：" + productId);
        return "订单创建成功";
    }
}
```

### redisson watchdog？
一旦业务超过了锁的时间，但是业务还没有执行完成，redission会通过lua脚本续期成30s。