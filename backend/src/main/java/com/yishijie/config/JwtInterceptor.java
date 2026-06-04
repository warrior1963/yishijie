package com.yishijie.config;

import com.yishijie.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * JWT 拦截器
 * 拦截所有需要鉴权的请求，验证 token 合法性
 */
@Component
public class JwtInterceptor implements HandlerInterceptor {

    @Autowired
    private JwtUtil jwtUtil;

    private static final String[] EXCLUDE_PATHS = {
        "/user/login",
        "/user/register",
        "/user/logout",
        "/admin/login",
        "/swagger-ui.html",
        "/doc.html",
        "/v3/api-docs",
        "/swagger-resources",
        "/webjars"
    };

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 检查是否在排除列表中
        String requestPath = request.getRequestURI();
        for (String excludePath : EXCLUDE_PATHS) {
            if (requestPath.contains(excludePath)) {
                return true;
            }
        }

        // 从请求头中获取 token
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        // 验证 token
        if (token == null || !jwtUtil.validateToken(token)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write("{\"code\":-1,\"message\":\"未授权：无效的token\",\"data\":null}");
            return false;
        }

        // 检查 token 是否过期
        if (jwtUtil.isTokenExpired(token)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write("{\"code\":-1,\"message\":\"未授权：token已过期\",\"data\":null}");
            return false;
        }

        // 将用户ID存放到 request 中供后续使用
        Long userId = jwtUtil.getUserIdFromToken(token);
        request.setAttribute("userId", userId);

        return true;
    }
}
