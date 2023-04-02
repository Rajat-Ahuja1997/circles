import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Circle } from 'src/circle/circle.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  author: number;

  @Column({ default: 0 })
  likes: number;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(() => Circle, circle => circle.posts, { eager: true })
  circle: Circle;}

/**
 * Possible tweet SQL table
 * | Column Name   | Data Type  | Description                                      |
|---------------|------------|--------------------------------------------------|
| id            | integer    | Unique identifier for the tweet                  |
| user_id       | integer    | Identifier for the user who posted the tweet     |
| text          | text       | The content of the tweet                          |
| created_at    | timestamp  | The date and time the tweet was posted            |
| updated_at    | timestamp  | The date and time the tweet was last updated      |
| retweet_count | integer    | The number of times the tweet has been retweeted   |
| favorite_count| integer    | The number of times the tweet has been favorited   |
| is_reply      | boolean    | Whether the tweet is a reply to another tweet     |
| reply_to_tweet_id | integer | Identifier for the tweet that this tweet is a reply to |
| hashtags      | text       | List of hashtags used in the tweet, separated by commas |
| mentions      | text       | List of user IDs mentioned in the tweet, separated by commas |
 */
