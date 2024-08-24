package com.whoami.Shoppingify.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.whoami.Shoppingify.domain.user.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;

@Service
public class JWTProviderService {
    @Value("${security.jwt.secret}")
    private String jwtSecret;

    public String generateToken(User user){
        try{
            Algorithm algorithm = Algorithm.HMAC256(jwtSecret);

            return JWT.create()
                    .withIssuer("login-auth-api")
                    .withSubject(user.getEmail())
                    .withExpiresAt(this.generateExpirationDate())
                    .sign(algorithm);
        }catch (JWTCreationException exception){
            throw new RuntimeException("");
        }
    }

    public String validateToken(String token){
        Algorithm algorithm = Algorithm.HMAC256(jwtSecret);
        try {
            return JWT.require(algorithm)
                    .withIssuer("login-auth-api")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException e) {
            return null;
        }
    }


    private Instant generateExpirationDate(){
        return Instant.now().plus(Duration.ofHours(2));
    }
}
