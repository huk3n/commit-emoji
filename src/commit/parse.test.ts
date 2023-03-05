import { expect, it, describe } from 'vitest';
import { parse } from './parse.mjs';


describe('parse.mts', function(){
  it('should empty message', function() {
    const commit = parse('');
    expect(commit).toBe(null);
  });
  it('should standard information', function() {
    const commit = parse('type(scope): subject\n\nbody\n\nfooter');
    expect(commit.header).toBe('type(scope): subject');
    expect(commit.body).toBe('body');
    expect(commit.footer).toBe('footer');
  });
  it('should only header', function() {
    const commit = parse('type(scope): subject');
    expect(commit.header).toBe('type(scope): subject');
    expect(commit.body).toBe(null);
    expect(commit.footer).toBe(null);

    const commit2 = parse('type(scope): subject\n');
    expect(commit2.header).toBe('type(scope): subject');
    expect(commit2.body).toBe(null);
    expect(commit2.footer).toBe(null);
  });

  it('should exist body not exist footer', function() {
    const commit = parse('type(scope): subject\n\nbody');
    expect(commit.header).toBe('type(scope): subject');
    expect(commit.body).toBe('body');
    expect(commit.footer).toBe(null);
    const commit1 = parse('type(scope): subject\n\nbody\n');
    expect(commit1.header).toBe('type(scope): subject');
    expect(commit1.body).toBe('body');
    expect(commit1.footer).toBe(null);
  });
  it('should 多行body', function() {
    const commit = parse('type(scope): subject\n\nbody\nbody1\nbody2');
    expect(commit.header).toBe('type(scope): subject');
    expect(commit.body).toBe('body\nbody1\nbody2');
    expect(commit.footer).toBe(null);
  });
  it('should 多行body 多行footer', function() {
    const commit = parse('type(scope): subject\n\nbody\nbody1\nbody2\n\nfooter\nfooter1');
    expect(commit.header).toBe('type(scope): subject');
    expect(commit.body).toBe('body\nbody1\nbody2');
    expect(commit.footer).toBe('footer\nfooter1');
  });
  it('should 多行body 多行footer', function() {
    const commit = parse('type(scope): subject\n \nbody\nbody1\nbody2\n\nfooter\nfooter1');
    expect(commit.header).toBe('type(scope): subject');
    expect(commit.body).toBe('body\nbody1\nbody2');
    expect(commit.footer).toBe('footer\nfooter1');
  });
});

