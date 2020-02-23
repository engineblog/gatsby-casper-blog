import React, { Component } from 'react';
import './About.css';

class About extends Component {
  render() {
    return (
      <div className="about">
        <h1>Mission</h1>
        <p>
          Being a developer is awesome. It can be challenging at times, but
          that&apos;s part of what makes it awesome. It&apos;s also what turns a
          lot of people away, or makes them give up on it. There have been times
          where I wonder if I have chosen the right career path because I did
          not feel like a competent developer. Others seem to pick it up
          quicker, find it easier, and are just plain better at it than me. I
          used to be so intimidated when I heard terms like &quot;API&quot;,
          &quot;Frontend Framework&quot;, or when people would ask me about my
          &quot;stack&quot;. Googling things would lead me to pages that I
          didn&apos;t understand, and made me doubt myself even more. The goal
          of this blog is to eliminate that feeling of intimidation, of
          inadequacy. I want to provide easy-to-provide solutions to developers
          who have asked the same questions I have, had the same frustrations
          I&apos;ve had. I want to show other developers that they can take on
          any topic, so long as they have some time, a little patience, and a
          practical approach.
          <br />
          <br />
          You too can be <strong>The Engine.</strong>
        </p>
        <h2>Content</h2>
        <p>
          The type of content you can expect to see here will be focused on
          learning, approaches, mindsets, and experiences. Another way to say
          that is: I post about things that gave me trouble, but I eventually
          figured out. Specifically, I post about how I figured it out, and
          break it down in hopes that anyone reading doesn&apos;t have to.
          Expect to see detailed code examples with detailed explanations. Some
          content may be influenced by opinion, but that opinion is influenced
          by experience. I do not claim to know the best way to do something, or
          the best tools to use. I am simply sharing what I have found works for
          me, what does not, and why. That being said, I aim to provide answers
          to the questions that other developers might have, while also
          encouraging a positive, productive mindset. I want my posts to bring
          understanding, and fill in the gaps that I know I needed to fill to
          get where I am today. I sincerely hope you enjoy the reading!
          <br />
          <br />
          keep <strong>chugging.</strong>
        </p>
        <h2>Suggestions</h2>
        <p>
          If there&apos;s something you would like to see me post about, or if
          you want to provide feedback on the content itself, please{' '}
          <a href="mailto:whistle@theengine.tech">let me know!</a> I know that I
          might be posting about Gatsby, while you&apos;re working through
          issues in Vue. I might make a post about Digital Ocean, but you have a
          question about Linode. And that&apos;s okay! Send me an email with the
          topic you&apos;d like me to cover, and there is a good chance I will
          write about it. The chances of me writing about a suggested topic
          depend on my familiarity with the topic, and how long it would take me
          to research. I should have a comments section set up in the future to
          make suggestions and feedback more streamlined.
        </p>
        <h2>Collaboration</h2>
        <p>
          As of right now, The Engine is a solo endeavor. However, if you feel
          like you have knowledge that you can share, and it aligns with the
          type of content here, then I would be glad to feature your post on the
          blog! If you&apos;re interested,{' '}
          <a href="mailto:whistle@theengine.tech">email</a> me your blog post, a
          quick bio, and any social media links you want to include in the bio.
        </p>
      </div>
    );
  }
}

export default About;
