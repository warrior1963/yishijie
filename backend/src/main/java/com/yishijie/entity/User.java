package com.yishijie.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * 用户实体
 */
@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String phone;

    @Column(nullable = false)
    private String realName;

    @Column(unique = true)
    private String wechatOpenId;

    @Column(columnDefinition = "INT DEFAULT 0")
    private Integer age;

    @Column(columnDefinition = "VARCHAR(20) DEFAULT 'M'")
    private String gender;

    @Column(columnDefinition = "TEXT")
    private String healthInfo;

    @Column(columnDefinition = "INT DEFAULT 0")
    private Integer healthScore;

    @Column(columnDefinition = "INT DEFAULT 0")
    private Integer integralScore;

    @Column(columnDefinition = "INT DEFAULT 0")
    private Integer promotionCount;

    @Column(columnDefinition = "DECIMAL(10,2) DEFAULT 0")
    private Double promotionReward;

    @Column(columnDefinition = "INT DEFAULT 0")
    private Integer status;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createTime;

    @Column(nullable = false)
    private LocalDateTime updateTime;

    @PrePersist
    protected void onCreate() {
        createTime = LocalDateTime.now();
        updateTime = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updateTime = LocalDateTime.now();
    }
}
