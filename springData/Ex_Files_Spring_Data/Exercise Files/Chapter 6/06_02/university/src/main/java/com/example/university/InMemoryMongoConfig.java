package com.example.university;

import com.github.fakemongo.Fongo;
import com.mongodb.Mongo;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;

/**
 * Created by maryellenbowman.
 */
@Configuration
public class InMemoryMongoConfig extends AbstractMongoConfiguration {


    @Override
    protected String getDatabaseName() {
        return "in-memory-db";
    }

    @Override
    public Mongo mongo() throws Exception {
        return new Fongo(getDatabaseName()).getMongo();
    }
}
